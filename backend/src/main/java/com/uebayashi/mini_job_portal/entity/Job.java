package com.uebayashi.mini_job_portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //主キー、
    @Column(name = "id") // カラム名を指定
    private Long id;

    @Column(name = "title", nullable = false, length = 100) // 必須フィールド、最大100文字
    private String title;

    @Column(name = "company", nullable = false, length = 50) // 必須フィールド、最大50文字
    private String company;

    @Column(name = "description", columnDefinition = "TEXT", length = 200) // 任意フィールド、TEXT型
    private String description;

    @Column(name = "created_at", nullable = false) // 作成日時
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
