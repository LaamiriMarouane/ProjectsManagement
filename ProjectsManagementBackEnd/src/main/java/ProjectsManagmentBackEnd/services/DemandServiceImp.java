package ProjectsManagmentBackEnd.services;

import ProjectsManagmentBackEnd.dtos.DemandDTO;
import ProjectsManagmentBackEnd.entity.demand.Demand;
import ProjectsManagmentBackEnd.entity.demand.DemandState;
import ProjectsManagmentBackEnd.entity.user.RoleType;
import ProjectsManagmentBackEnd.entity.user.User;
import ProjectsManagmentBackEnd.exceptions.BusinessException;
import ProjectsManagmentBackEnd.mappers.DemandMapper;
import ProjectsManagmentBackEnd.mappers.UserMapper;
import ProjectsManagmentBackEnd.repository.DemandRepository;
import ProjectsManagmentBackEnd.repository.UserRepository;
import ProjectsManagmentBackEnd.services.validation.DemandValidator;
import ProjectsManagmentBackEnd.utils.UserContext;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DemandServiceImp {
    private DemandValidator demandValidator;
    private DemandRepository demandRepository;
    private ProjectServiceImp projectServiceImp;
    private UserRepository userRepository;

    public ResponseEntity<DemandDTO> create(DemandDTO demandDTO)  throws BusinessException {
        demandValidator.demandValidate(demandDTO);
        demandDTO.setUser(UserMapper.convertShort(UserContext.currentUser()));
        demandDTO.setDemandState(DemandState.NEW);
        User user =userRepository.findById(demandDTO.getUser().getId()).get();
        Demand newDemand=DemandMapper.convert(demandDTO,user);

        return ResponseEntity.status(HttpStatus.CREATED).body(DemandMapper.convert( demandRepository.save(newDemand)));
    }
    public ResponseEntity<DemandDTO> validate(String demandId)  throws BusinessException {
       Optional<Demand> demand=demandRepository.findById(demandId);
        User user=UserContext.currentUser();
        if (!demand.isPresent()){
            Map errorMap=new HashMap<>();
            errorMap.put("error validating demand ","demand not found.");
            throw new BusinessException("error",errorMap);
        }
        demand.get().setDemandState(DemandState.COMPLETED);
        demandRepository.save( demand.get());
        // to do create a new Project
        projectServiceImp.create(DemandMapper.convertToProject(demand.get()),user);
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
    public ResponseEntity<List<DemandState>> getAllDemandStates() {
        List<DemandState> demandDTOList;
        User user=UserContext.currentUser();
        if(user.getRole().getName()== RoleType.APP_ADMIN){
            demandDTOList= Arrays.asList(DemandState.COMPLETED,DemandState.REJECTED);
        }else{
            demandDTOList= Arrays.asList(DemandState.CANCELLED);        }
        return ResponseEntity.status(HttpStatus.OK).body(demandDTOList);

    }



    public ResponseEntity<DemandDTO> update(DemandDTO demandDTO) throws BusinessException {
        demandValidator.demandValidate(demandDTO);
        Optional<Demand> demandToUpdate= demandRepository.findById(demandDTO.getId());
        User user =userRepository.findById(demandDTO.getUser().getId()).get();
        if(demandToUpdate.isPresent()){
            Demand demandUpdated = demandRepository.save( DemandMapper.convert(demandDTO,user));

          return   ResponseEntity.status(HttpStatus.OK).body(DemandMapper.convert(demandUpdated));
        }else {
            throw new BusinessException("Demand does not exist");
        }

    }

    public ResponseEntity delete(String id) {
        demandRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();

    }
}
