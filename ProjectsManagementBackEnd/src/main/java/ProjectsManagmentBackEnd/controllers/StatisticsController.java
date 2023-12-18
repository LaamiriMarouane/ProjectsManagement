package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.StatisticsResponse;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.StatisticsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(ApiPaths.V1)
@AllArgsConstructor
public class StatisticsController {

    private StatisticsService statisticsService;

    @GetMapping(ApiPaths.STATISTICS)
    public ResponseEntity<StatisticsResponse> getAll()  {
        return statisticsService.getAll();

    }
}
