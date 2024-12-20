package com.example.web_fashion.converter;

import com.example.web_fashion.entity.DetailSizeProduct;
import com.example.web_fashion.entity.Product;
import com.example.web_fashion.entity.Size;
import com.example.web_fashion.model.dto.ProductDTO;
import com.example.web_fashion.repository.IDetailSizeProductRepository;
import com.example.web_fashion.repository.IProductRepository;
import com.example.web_fashion.repository.ISizeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductDTOConverter {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IDetailSizeProductRepository detailSizeProductRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ISizeRepository sizeRepository;
    public ProductDTO convertProductToProductDTO(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setSold(product.getSold());
        productDTO.setDayCreateProduct(product.getCreatedAt());
        List<DetailSizeProduct> detailSizeProducts = product.getDetailSizeProducts();
        String detailSizeProductsString = detailSizeProducts.stream().map(it -> it.getSize().getName().toString()).collect(Collectors.joining(", "));
        productDTO.setDetailSizeProducts(detailSizeProductsString);
        return productDTO;
    }

    public Product convertProductDTOToProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        product = productRepository.save(product);
        List<DetailSizeProduct> detailSizeProducts = new ArrayList<>();
        String stringSize = productDTO.getDetailSizeProducts().trim();
        String[] nameSize = stringSize.split("\\s*,\\s*");
        for(String item: nameSize){
            Size size = sizeRepository.findByName(item);
            if(size != null){
                DetailSizeProduct detailSizeProduct = new DetailSizeProduct();
                detailSizeProduct.setProduct(product);
                detailSizeProduct.setSize(size);
                detailSizeProductRepository.save(detailSizeProduct);
                detailSizeProducts.add(detailSizeProduct);
            }
        }
        product.setDetailSizeProducts(detailSizeProducts);
        return product;
    }
    @Modifying
    public Product convertProductDTOToProductUpdate(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        productRepository.save(product);
        List<DetailSizeProduct> detailSizeProducts = new ArrayList<>();
        String stringSize = productDTO.getDetailSizeProducts().trim();
        String[] nameSize = stringSize.split("\\s*,\\s*");
        detailSizeProductRepository.deleteByProduct(product);
        for(String item: nameSize){
            Size size = sizeRepository.findByName(item);
            if(size != null){
                DetailSizeProduct sizeProduct = new DetailSizeProduct();
                sizeProduct.setSize(size);
                sizeProduct.setProduct(product);
                detailSizeProducts.add(sizeProduct);
                detailSizeProductRepository.save(sizeProduct);
            }
        }
        product.setDetailSizeProducts(detailSizeProducts);
        return product;
    }
}
