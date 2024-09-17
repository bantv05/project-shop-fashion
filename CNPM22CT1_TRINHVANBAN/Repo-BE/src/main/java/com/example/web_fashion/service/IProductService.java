package com.example.web_fashion.service;

import com.example.web_fashion.dto.CategoryDTO;
import com.example.web_fashion.dto.ProductDTO;
import com.example.web_fashion.dto.StyleDTO;
import com.example.web_fashion.model.Style;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface IProductService {
    List<ProductDTO> findAll();
    List<ProductDTO> getProductsSearch(Map<String, Object> params, List<String> categoryDTOS, List<String> styles);
}
//List <BuildingSearchResponse> findAll(Map<String, Object> conditions, List<String> typeCode);
//ResponseDTO save(BuildingDTO buildingDTO);
//BuildingDTO findBuildingById(Long id);
//ResponseDTO deleteBuildings(List<Long> buildingIds);
//ResponseDTO findStaffsByBuildingId(Long buildingId);
//ResponseDTO updateAssignmentTable(AssignmentDTO assignmentBuildingDTO);
