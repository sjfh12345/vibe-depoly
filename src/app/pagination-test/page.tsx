'use client';

import React, { useState } from 'react';
import Pagination from '../../commons/components/pagination';

export default function PaginationTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>페이지네이션 테스트</h1>
      
      <div>
        <h2>Primary 스타일 (기본)</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          variant="primary"
        />
      </div>
      
      <div>
        <h2>Secondary 스타일</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          variant="secondary"
        />
      </div>
      
      <div>
        <h2>Tertiary 스타일</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          variant="tertiary"
        />
      </div>
      
      <div>
        <h2>Small 사이즈</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          size="small"
        />
      </div>
      
      <div>
        <h2>Medium 사이즈 (기본)</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          size="medium"
        />
      </div>
      
      <div>
        <h2>Large 사이즈</h2>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          size="large"
        />
      </div>
      
      <div>
        <p>현재 페이지: {currentPage}</p>
      </div>
    </div>
  );
}
