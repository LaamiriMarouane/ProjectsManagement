package ProjectsManagmentBackEnd.controllers;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.holders.ApiPaths;
import ProjectsManagmentBackEnd.services.DemandServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping(ApiPaths.USERS)
    public ResponseEntity<List<DemandDTO>> getUserAll()  {
        return demandService.getUserAll();

    }
    @GetMapping("/demand-states")
    public ResponseEntity<List<DemandState>> getAllDemandStates()  {
        return demandService.getAllDemandStates();
    }

    @GetMapping("/new")
    public ResponseEntity<List<DemandDTO>> getNew()  {
        return demandService.getAllByDemandState(DemandState.NEW);
    }
    @GetMapping("/rejected")
    public ResponseEntity<List<DemandDTO>> getRejected()  {
        return demandService.getAllByDemandState(DemandState.REJECTED);
    }
    @GetMapping("/accepted")
    public ResponseEntity<List<DemandDTO>> getAccepted()  {
        return demandService.getAllByDemandState(DemandState.COMPLETED);
    }
    @GetMapping(ApiPaths.USERS+"/new")
    public ResponseEntity<List<DemandDTO>> getUserNew()  {
        return demandService.getUserAllByDemandState(DemandState.NEW);
    }
    @GetMapping(ApiPaths.USERS+"/rejected")
    public ResponseEntity<List<DemandDTO>> getUserRejected()  {
        return demandService.getUserAllByDemandState(DemandState.REJECTED);
    }
    @GetMapping(ApiPaths.USERS+"/accepted")
    public ResponseEntity<List<DemandDTO>> getUserAccepted()  {
        return demandService.getUserAllByDemandState(DemandState.COMPLETED);
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
        return demandService.handleDemandDecision(demandId, DemandState.COMPLETED);
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<DemandDTO> rejectDemand( @PathVariable("id") String demandId) throws BusinessException {
        return demandService.handleDemandDecision(demandId, DemandState.REJECTED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteDemand( @PathVariable("id") String id)  {
        return demandService.delete(id);
    }
}
