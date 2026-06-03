import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Register the axe matcher globally so expect(...).toHaveNoViolations() works.
expect.extend(toHaveNoViolations);
