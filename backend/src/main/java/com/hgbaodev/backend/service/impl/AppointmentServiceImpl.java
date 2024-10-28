package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Appointment;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.AppointmentRepository;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.AppointmentService;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Override
    public Appointment addAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment updateAppointment(Appointment appointment){
        Appointment check = appointmentRepository.findById(appointment.getAppointmentID())
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        return appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(Integer appointmentID){
        Appointment check = appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        appointmentRepository.deleteById(appointmentID);
    }

    @Override
    public Appointment getAppointmentById(Integer appointmentID){
        return appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
    }

    @Override
    public Page<Appointment> getAllAppointments(int page, int size, String keyword){
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return appointmentRepository.findByKeyword(keyword, pageable);
        }
        return appointmentRepository.findAll(pageable);
    }

}
