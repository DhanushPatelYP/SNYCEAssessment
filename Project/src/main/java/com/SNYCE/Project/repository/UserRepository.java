package com.SNYCE.Project.repository;

import com.SNYCE.Project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsernameAndPassword(String username, String password);

    @Query("SELECT u FROM User u WHERE u.role=:n")
    public List<User> findAllByRole(@Param("n") String role);
}
