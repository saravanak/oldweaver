import { render, screen } from '@testing-library/preact';
import Multiplication from '../../multiplication';

describe('Multipliation', () => {
  it('should honour props', async () => {
    render(<Multiplication multiplicant={5} multiplier={2} />);
    expect(await screen.findByTestId('mult-answer')).toHaveTextContent('10');
  });
  it('should work with no props', async () => {
    render(<Multiplication />);
    expect(await screen.findByTestId('mult-answer')).toHaveTextContent('1008');
  });
});
