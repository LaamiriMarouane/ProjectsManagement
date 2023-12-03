package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.security.JwtAuthenticationRequest;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.DemandServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping(ApiPaths.V1)
@AllArgsConstructor
public class DemandController {

    DemandServiceImp demandService;

    @PostMapping(ApiPaths.DEMANDS)
    public ResponseEntity<DemandDTO> createDemand(@RequestBody DemandDTO demandDTO) throws BusinessException {
        return demandService.create(demandDTO);

    }
}
