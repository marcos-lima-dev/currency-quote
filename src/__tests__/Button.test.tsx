// src/__tests__/Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/common/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Testar</Button>
    );
    
    fireEvent.click(getByText('Testar'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});