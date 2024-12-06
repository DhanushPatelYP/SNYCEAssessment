package com.SNYCE.Project.repository;

import com.SNYCE.Project.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result,Integer> {
    List<Result> findAllByUserId(Integer userId);
}
