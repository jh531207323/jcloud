package com.angelj.jcloudcommon.util.wrapper.data;

import java.io.Serializable;
import java.util.List;

public class PageDataWrapper<T> implements Serializable {

    private static final long serialVersionUID = -7133729783406002614L;

    private long pageIndex;
    private long pageSize;

    private long pageCount;

    private long pageBegin;
    private long pageEnd;

    private long dataCount;

    private String sortName;
    private String sortMode;

    private boolean isSearch;

    private List<?> data;

    private T queryObject;


    public long getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(long pageIndex) {
        this.pageIndex = pageIndex;
    }

    public long getPageSize() {
        return pageSize;
    }

    public void setPageSize(long pageSize) {
        this.pageSize = pageSize;
    }

    public long getPageCount() {
        return pageCount;
    }

    public void setPageCount(long pageCount) {

        this.pageCount = pageCount;
    }

    public long getPageBegin() {
        return pageBegin;
    }

    public void setPageBegin(long pageBegin) {
        this.pageBegin = pageBegin;
    }

    public long getPageEnd() {
        return pageEnd;
    }

    public void setPageEnd(long pageEnd) {
        this.pageEnd = pageEnd;
    }


    public long getDataCount() {
        return dataCount;
    }

    public void setDataCount(long dataCount) {
        this.dataCount = dataCount;

        this.pageCount = (this.dataCount + this.pageSize - 1) / this.pageSize;
        this.pageBegin = (this.pageIndex - 1) * this.pageSize;
        this.pageEnd = this.pageIndex * this.pageSize;
        this.pageEnd = this.pageEnd > this.dataCount ? this.dataCount : this.pageEnd;
    }

    public String getSortName() {
        return sortName;
    }

    public void setSortName(String sortName) {
        this.sortName = sortName;
    }

    public String getSortMode() {
        return sortMode;
    }

    public void setSortMode(String sortMode) {
        this.sortMode = sortMode;
    }

    public boolean isSearch() {
        return isSearch;
    }

    public void setSearch(boolean search) {
        isSearch = search;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<?> data) {
        this.data = data;
    }

    public T getQueryObject() {
        return queryObject;
    }

    public void setQueryObject(T queryObject) {
        this.queryObject = queryObject;
    }

    public PageDataWrapper() {

        this.setPageIndex(1);
        this.setPageSize(20);
        this.setPageBegin(0);
        this.setPageEnd(0);
        this.setPageCount(0);

    }

}