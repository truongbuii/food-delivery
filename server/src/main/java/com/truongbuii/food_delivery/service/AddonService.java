package com.truongbuii.food_delivery.service;

import com.truongbuii.food_delivery.exception.DuplicateResourceException;
import com.truongbuii.food_delivery.exception.ResourceNotFoundException;
import com.truongbuii.food_delivery.model.common.ErrorCode;
import com.truongbuii.food_delivery.model.entity.Addon;
import com.truongbuii.food_delivery.model.enums.MediaFolder;
import com.truongbuii.food_delivery.model.request.addon.AddonPost;
import com.truongbuii.food_delivery.model.request.addon.AddonPut;
import com.truongbuii.food_delivery.repository.AddonRepository;
import com.truongbuii.food_delivery.utils.validateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddonService {
    private final MediaService mediaService;
    private final AddonRepository addonRepository;

    public Addon getAddonById(Long id) {
        return addonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.ERR_ADDON_NOT_FOUND));
    }

    public List<Addon> getAllByIdIn(List<Long> addonIds) {
        return addonRepository.findByIdIn(addonIds);
    }

    /*
     * This method is used to check if the addonIds exist in the database
     * And make sure that no addonId is duplicated
     */
    public Set<Addon> checkAddonIdExist(List<Long> addonIds) {
        List<Addon> addons = getAllByIdIn(addonIds);
        Set<Long> existingAddonIds = addons.stream()
                .map(Addon::getId)
                .collect(Collectors.toSet());
        List<Long> notFoundAddonIds = addonIds.stream()
                .filter(id -> !existingAddonIds.contains(id))
                .toList();
        if (!notFoundAddonIds.isEmpty()) {
            throw new ResourceNotFoundException(ErrorCode.ERR_ADDON_NOT_FOUND);
        }
        return Set.copyOf(addons);
    }

    public Addon create(AddonPost addonPost) {
        validateAddon(addonPost.name(), null);
        String imageUrl = "";
        Addon addon = new Addon();
        if (addonPost.image() != null && !addonPost.image().isEmpty()) {
            imageUrl = mediaService.uploadImage(
                    addonPost.image(),
                    MediaFolder.FOOD.getFolderName()
            );
        }
        addon.setImageUrl(imageUrl);
        addon.setName(addonPost.name());
        addon.setPrice(addonPost.price());

        return addonRepository.save(addon);
    }

    public Addon update(AddonPut addonPut) {
        validateAddon(addonPut.name(), addonPut.id());
        Addon addon = getAddonById(addonPut.id());
        if (addonPut.image() != null && !addonPut.image().isEmpty()) {
            if (addon.getImageUrl() != null) {
                mediaService.deleteImage(
                        addon.getImageUrl(),
                        MediaFolder.ADDON.getFolderName()
                );
            }
            String imageUrl = mediaService.uploadImage(
                    addonPut.image(),
                    MediaFolder.ADDON.getFolderName()
            );
            addon.setImageUrl(imageUrl);
        }
        validateUtils.checkAndUpdateField(addon::setName, addonPut.name(), addon.getName());
        validateUtils.checkAndUpdateField(addon::setPrice, addonPut.price(), addon.getPrice());

        return addonRepository.save(addon);
    }

    private void validateAddon(String name, Long id) {
        if (checkExist(name, id)) {
            throw new DuplicateResourceException(ErrorCode.ERR_ADDON_DUPLICATE);
        }
    }

    private boolean checkExist(String name, Long id) {
        return addonRepository.findExistByName(name, id) != null;
    }

}
