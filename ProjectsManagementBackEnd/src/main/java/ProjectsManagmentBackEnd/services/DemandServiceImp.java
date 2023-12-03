package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.entity.demand.Demand;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.DemandMapper;
import ProjectsManagmentBackEnd.repository.DemandRepository;
import ProjectsManagmentBackEnd.services.validation.DemandValidator;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class DemandServiceImp {
    private DemandValidator demandValidator;
    private DemandRepository demandRepository;

    public ResponseEntity<DemandDTO> create(DemandDTO demandDTO)  throws BusinessException {
        demandValidator.demandValidate(demandDTO);
        demandDTO.setUser(UserContext.currentUser());
        Demand newDemand=DemandMapper.convert(demandDTO);
        demandRepository.save(newDemand);
        return ResponseEntity.status(HttpStatus.CREATED).body(demandDTO);
    }
    public ResponseEntity<DemandDTO> validate(String demandId)  throws BusinessException {
       Optional<Demand> demand=demandRepository.findById(demandId);
        if (!demand.isPresent()){
            Map errorMap=new HashMap<>();
            errorMap.put("error validating demand ","demand not found.");
            throw new BusinessException("error",errorMap);
        }
        demand.get().setDemandState(DemandState.COMPLETED);
        demandRepository.save( demand.get());
        // to do create a new Project
        return ResponseEntity.status(HttpStatus.OK).body(DemandMapper.convert(demand.get()));
    }
    public ResponseEntity<List<DemandDTO>> getAll() {
        List<DemandDTO> demandDTOList;
        User user=UserContext.currentUser();
        if(user.getRole().getName()== RoleType.APP_ADMIN){
            demandDTOList=demandRepository.findAll().stream().map(DemandMapper::convert).collect(Collectors.toList());
        }else{
            demandDTOList=demandRepository.findAllByUser(user).get().stream().map(DemandMapper::convert).collect(Collectors.toList());
        }
        return ResponseEntity.status(HttpStatus.OK).body(demandDTOList);

    }

    public void update(DemandDTO demandDTO) {

    }

    public void delete(String id) {

    }
}
