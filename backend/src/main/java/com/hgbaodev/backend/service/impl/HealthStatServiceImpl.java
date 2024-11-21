package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.HealthStat;
import com.hgbaodev.backend.repository.HealthStatRepository;
import com.hgbaodev.backend.service.HealthStatService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HealthStatServiceImpl implements HealthStatService {

    private final HealthStatRepository healthStatRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public HealthStat addHealthStat(HealthStat healthStat) {
        return healthStatRepository.save(healthStat);
    }

    @Override
    public HealthStat updateHealthStat(HealthStat healthStat) {
        HealthStat check = healthStatRepository.findById(healthStat.getId())
                .orElseThrow(() -> new IllegalArgumentException("Health status not found"));
        healthStat.setId(check.getId());
        healthStat.setMember(check.getMember());
        return healthStatRepository.save(healthStat);
    }

    @Override
    public void deleteHealthStat(Integer statID) {
        healthStatRepository.deleteById(statID);
    }

    @Override
    public HealthStat getHealthStatById(Integer statID) {
        return healthStatRepository.findById(statID)
                .orElseThrow(() -> new IllegalArgumentException("Health status not found"));
    }

    @Override
    public List<HealthStat> getAllHealthStats(Integer memberId, String date) {
        if (date != null && !date.isEmpty()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-DD HH-mm");
                LocalDateTime parseDate = LocalDateTime.parse(date, formatter);
                return healthStatRepository.findByDate(parseDate);
            } catch (DateTimeParseException e) {
                System.out.println("Date format is invalid: " + e.getMessage());
            }
        }
        return healthStatRepository.findAllById(memberId);
    }

    @Override
    public List<HealthStat> getHealthStatsByStatType(Integer id, String statType, String date) {
        if (date != null && !date.isEmpty()) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate parseDate = LocalDate.parse(date, formatter);
                log.info(parseDate.toString());
                return healthStatRepository.getAllHealthStatsByStatTypeHasDate(id, statType, parseDate);
            } catch (DateTimeParseException e) {
                System.out.println("Date format is invalid: " + e.getMessage());
            }
        }
        return healthStatRepository.getAllHealthStatsByStatType(id, statType);
    }

    @Override
    public List<HealthStat> getHealthStatsToDisplayChart(Integer memberId, String statType, String date) {
        List<HealthStat> results;
        TypedQuery<HealthStat> query;
        if (date != null && !date.isEmpty()) {
            java.sql.Date sqlDate = java.sql.Date.valueOf(date);
            query = entityManager.createQuery(
                    "SELECT h \n" +
                            "FROM HealthStat h \n" +
                            "WHERE h.member.id = :memberId \n" +
                            "  AND h.statType = :statType \n" +
                            "  AND DATE(h.date) >= :date \n" +
                            "  AND DATE(h.date) <= CURRENT_DATE\n" +
                            "ORDER BY h.date ASC\n",
                    HealthStat.class);
            query.setParameter("memberId", memberId);
            query.setParameter("statType", statType);
            query.setParameter("date", sqlDate);
            query.setFirstResult(0); // Bắt đầu từ dòng đầu tiên
            query.setMaxResults(5); // Giới hạn trả về 5 bản ghi
            results = query.getResultList();
        } else {
            query = entityManager.createQuery(
                    "SELECT h \n" +
                            "FROM HealthStat h \n" +
                            "WHERE h.member.id = :memberId \n" +
                            "   AND h.statType = :statType \n" +
                            "ORDER BY h.date DESC",
                    HealthStat.class);
            query.setParameter("memberId", memberId);
            query.setParameter("statType", statType);
            query.setFirstResult(0); // Bắt đầu từ dòng đầu tiên
            query.setMaxResults(5); // Giới hạn trả về 5 bản ghi
            results = query.getResultList();

            // Để lấy ra 5 bản ghi này theo thứ tự tăng dần theo date
            Collections.sort(results, Comparator.comparing(HealthStat::getDate));
        }
        return results;
    }

}
