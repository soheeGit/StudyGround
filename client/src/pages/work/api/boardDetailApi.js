import { useEffect, useState } from 'react';
import axios from 'axios';

export const fetchBoardDetails = async (boardId) => {
  try {
    const response = await axios.get(`/api/partBoards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board details:', error);
    throw new Error('Failed to fetch board details');
  }
};
