package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Appointment;
import com.hgbaodev.backend.model.Member;
import org.springframework.data.domain.Page;


public interface AppointmentService {
    Appointment addAppointment(Appointment appointment);
    Appointment updateAppointment(Appointment appointment);
    void deleteAppointment(Integer appointmentID);
    Appointment getAppointmentById(Integer appointmentID);
    Page<Appointment> getAllAppointments(int page, int size, String keyword);
}
