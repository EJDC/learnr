package com.learnr.Learnr.repositories;

import com.learnr.Learnr.models.Completion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompletionRepository extends JpaRepository<Completion, Long>{
}
