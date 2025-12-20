import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render button with text content', () => {
      render(<Button>Submit</Button>);
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should render button with React node children', () => {
      render(
        <Button>
          <span>Custom</span> Content
        </Button>
      );
      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    it('should apply primary variant when specified', () => {
      render(<Button variant="primary">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    it('should apply secondary variant', () => {
      render(<Button variant="secondary">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-secondary');
    });

    it('should apply success variant', () => {
      render(<Button variant="success">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-success');
    });

    it('should apply danger variant', () => {
      render(<Button variant="danger">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-danger');
    });

    it('should apply warning variant', () => {
      render(<Button variant="warning">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-warning');
    });

    it('should apply info variant', () => {
      render(<Button variant="info">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-info');
    });

    it('should apply light variant', () => {
      render(<Button variant="light">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-light');
    });

    it('should apply dark variant', () => {
      render(<Button variant="dark">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-dark');
    });
  });

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-medium');
    });

    it('should apply small size', () => {
      render(<Button size="small">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-small');
    });

    it('should apply medium size', () => {
      render(<Button size="medium">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-medium');
    });

    it('should apply large size', () => {
      render(<Button size="large">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-large');
    });
  });

  describe('Button Types', () => {
    it('should render as type button by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render as type submit', () => {
      render(<Button type="submit">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render as type reset', () => {
      render(<Button type="reset">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveClass('btn-disabled');
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn-disabled');
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button disabled onClick={handleClick}>
          Test
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should not show loading spinner by default', () => {
      render(<Button>Test</Button>);
      expect(screen.queryByRole('button')).not.toHaveClass('btn-loading');
      expect(screen.queryByRole('button')?.querySelector('.btn-spinner')).not.toBeInTheDocument();
    });

    it('should show loading spinner when loading prop is true', () => {
      render(<Button loading>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-loading');
      expect(button.querySelector('.btn-spinner')).toBeInTheDocument();
    });

    it('should be disabled when loading', () => {
      render(<Button loading>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should apply loading content class when loading', () => {
      render(<Button loading>Test</Button>);
      const button = screen.getByRole('button');
      const content = button.querySelector('.btn-content-loading');
      expect(content).toBeInTheDocument();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button loading onClick={handleClick}>
          Test
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Full Width', () => {
    it('should not be full width by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('btn-full-width');
    });

    it('should be full width when fullWidth prop is true', () => {
      render(<Button fullWidth>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-full-width');
    });
  });

  describe('Click Events', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick multiple times when clicked multiple times', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onClick when not provided', async () => {
      const user = userEvent.setup();
      
      render(<Button>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Should not throw error
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should combine custom className with default classes', () => {
      render(<Button className="custom-class" variant="secondary">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-secondary');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Base Classes', () => {
    it('should always have base btn class', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
    });

    it('should have all required classes', () => {
      render(
        <Button variant="primary" size="large" fullWidth>
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-primary');
      expect(button).toHaveClass('btn-large');
      expect(button).toHaveClass('btn-full-width');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a button', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have proper button semantics', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible with Space key', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<Button>{''}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle null children', () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle both disabled and loading props', () => {
      render(
        <Button disabled loading>
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn-disabled');
      expect(button).toHaveClass('btn-loading');
    });

    it('should prioritize loading state over disabled for disabling', () => {
      render(
        <Button disabled={false} loading>
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});

