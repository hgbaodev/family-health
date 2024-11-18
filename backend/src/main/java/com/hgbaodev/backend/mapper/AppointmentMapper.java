package com.hgbaodev.backend.mapper;

import com.hgbaodev.backend.dto.response.AppointmentResponse;
import com.hgbaodev.backend.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    @Mapping(source = "member.memberID", target = "member.memberID")
    AppointmentResponse toAppointmentResponse(Appointment appointment);

    default Page<AppointmentResponse> toAppointmentsResponse(Page<Appointment> appointments) {
        return appointments.map(this::toAppointmentResponse);
    }
}
