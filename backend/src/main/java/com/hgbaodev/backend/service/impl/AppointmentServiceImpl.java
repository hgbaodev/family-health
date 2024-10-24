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
    Appointment addAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    
    Appointment updateAppointment(Appointment appointment){

    }
    void deleteAppointment(Integer appointmentID){

    }
    Appointment getAppointmentById(Integer appointmentID){

    }
    Page<Appointment> getAllAppointments(int page, int size, String keyword){

    }

}
