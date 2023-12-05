package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.security.JwtAuthenticationRequest;
import ProjectsManagmentBackEnd.security.JwtAuthenticationResponse;
import ProjectsManagmentBackEnd.services.DemandServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.V1+ApiPaths.DEMANDS)
@AllArgsConstructor
public class DemandController {

    DemandServiceImp demandService;

    @GetMapping()
    public ResponseEntity<List<DemandDTO>> getAll()  {
        return demandService.getAll();

    }
    @PostMapping()
    public ResponseEntity<DemandDTO> createDemand(@RequestBody DemandDTO demandDTO) throws BusinessException {
        return demandService.create(demandDTO);
    }
    @PutMapping("/update")
    public ResponseEntity<DemandDTO> updateDemand(@RequestBody DemandDTO demandDTO ) throws BusinessException {
        return demandService.update(demandDTO);

    }
    @PutMapping("/validate/{id}")
    public ResponseEntity<DemandDTO> validateDemand( @PathVariable("id") String demandId) throws BusinessException {
        return demandService.validate(demandId);

    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteDemand( @PathVariable("id") String id)  {
        return demandService.delete(id);

    }
}
