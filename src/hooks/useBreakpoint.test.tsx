import { useBreakpoint, useBreakpointBetween } from './useBreakpoint';
import { HORIZONTAL_BREAKPOINTS, PREFERRED_VARIANT } from '../breakpoints.config';

// Mock react-responsive
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

import { useMediaQuery } from 'react-responsive';

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

describe('useBreakpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use min-width when variant is PREFERRED_VARIANT (MtF)', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpoint(768, PREFERRED_VARIANT);

    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      query: '(min-width: 768px)',
    });
  });

  it('should resolve named breakpoints to pixel values', () => {
    mockUseMediaQuery.mockReturnValue(false);

    useBreakpoint('md', PREFERRED_VARIANT);

    const mdBreakpoint = HORIZONTAL_BREAKPOINTS['md'];
    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      query: `(min-width: ${mdBreakpoint}px)`,
    });
  });

  it('should shift breakpoint by -1px when variant differs from PREFERRED_VARIANT (DtF)', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpoint(500, 'DtF');

    // PREFERRED_VARIANT is 'MtF', so DtF should subtract 1
    const expectedBp = 500 - 1;
    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      query: `(max-width: ${expectedBp}px)`,
    });
  });

  it('should use max-width for DtF variant when PREFERRED_VARIANT is MtF', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpoint(992, 'DtF');

    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      query: `(max-width: 991px)`,
    });
  });
});

describe('useBreakpointBetween', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reduce max by 1px for MtF variant', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpointBetween(320, 768, 'MtF');

    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      minWidth: 320,
      maxWidth: 767, // 768 - 1
    });
  });

  it('should increase min by 1px for DtF variant', () => {
    mockUseMediaQuery.mockReturnValue(false);

    useBreakpointBetween(320, 768, 'DtF');

    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      minWidth: 321, // 320 + 1
      maxWidth: 768,
    });
  });

  it('should resolve named breakpoints to pixel values', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpointBetween('sm', 'lg', 'MtF');

    const smBp = HORIZONTAL_BREAKPOINTS['sm'];
    const lgBp = HORIZONTAL_BREAKPOINTS['lg'];

    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      minWidth: smBp,
      maxWidth: lgBp - 1,
    });
  });

  it('should use PREFERRED_VARIANT by default', () => {
    mockUseMediaQuery.mockReturnValue(true);

    useBreakpointBetween(500, 1000);

    // Should use PREFERRED_VARIANT which is 'MtF'
    expect(mockUseMediaQuery).toHaveBeenCalledWith({
      minWidth: 500,
      maxWidth: 999, // 1000 - 1 (MtF reduces max)
    });
  });

  it('should return the result from react-responsive', () => {
    mockUseMediaQuery.mockReturnValue(true);

    const result = useBreakpoint(768);

    expect(result).toBe(true);
  });

  it('should return false from react-responsive', () => {
    mockUseMediaQuery.mockReturnValue(false);

    const result = useBreakpoint(768);

    expect(result).toBe(false);
  });
});
