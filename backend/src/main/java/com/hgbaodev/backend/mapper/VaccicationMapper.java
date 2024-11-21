package com.hgbaodev.backend.mapper;

import com.hgbaodev.backend.dto.response.VaccicationResponse;
import com.hgbaodev.backend.model.Vaccication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface VaccicationMapper {
    @Mapping(source = "member.id", target = "member.id")
    VaccicationResponse toVaccicationResponse(Vaccication vaccication);

    default Page<VaccicationResponse> toVaccicationsResponse(Page<Vaccication> vaccications) {
        return vaccications.map(this::toVaccicationResponse);
    }
}
