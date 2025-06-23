package com.upiiz.ajaxcrud.Repositories;

import com.upiiz.ajaxcrud.models.MascotaModel;

import java.util.List;

public interface MascotaRepository {
    public List<MascotaModel> findAllMascots();
    public MascotaModel findMascotById(int id);
    public MascotaModel save(MascotaModel model);
    public int update(MascotaModel model);
    public int delete(int id);
}
