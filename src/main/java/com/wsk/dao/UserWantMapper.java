package com.wsk.dao;

import com.wsk.pojo.UserWant;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserWantMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserWant record);

    int insertSelective(UserWant record);

    UserWant selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserWant record);

    int updateByPrimaryKey(UserWant record);

    int getCounts(int uid);

    List<UserWant> selectByUid(int uid, int start);

    @Select("select * from userwant where uid=#{id} and display=1 order by id desc limit 12")
    List<UserWant> selectMineByUid(int id);

    List<UserWant> selectAll();

    @Select("select * from userwant where sort=#{sort} and display=1 order by id desc")
    List<UserWant> selectBySort(int sort);

    @Select("select * from userwant where display=1 order by id desc limit #{start}, #{size}")
    List<UserWant> selectByPage(@Param("start") int start, @Param("size") int size);

    @Select("select count(*) from userwant where display=1")
    int getWantCounts();
}