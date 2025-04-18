package com.uebayashi.mini_job_portal.controller;

import com.uebayashi.mini_job_portal.entity.Job;
import com.uebayashi.mini_job_portal.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobRepository.findById(id);

        // 指定IDのデータが存在する場合はレスポンスにデータを返す
        if (job.isPresent()) {
            return ResponseEntity.ok(job.get());
        }
        
        // データが見つからない場合は404エラーを返す
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return "Job deleted with ID: " + id;
    }
}
