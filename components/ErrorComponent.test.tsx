import { render } from '@testing-library/react';
import Layout from '../app/layout';

// Mock component that throws an error
const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

test('renders error boundary fallback UI when child throws error', () => {
  // Render the layout with the problem child
  const { getByText } = render(
    <Layout>
      <ProblemChild />
    </Layout>
  );

  // Check if the fallback UI is displayed
  expect(getByText('Error occurred. Please try again later.')).toContain('An error occurred');
});