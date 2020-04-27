import React from 'react';
import { render } from '@testing-library/react';

import Popup from '../Popup';
import { Variable } from '../../../types';

describe('Popup', () => {
  it('renders correctly with exception note', () => {
    const feature = {
      id: '36005',
      properties: {
        COUNTY: 'Bronx County',
      },
      state: {
        cases: 12,
        deaths: 1,
      },
    };
    const { container } = render(<Popup feature={feature} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly without exception note', () => {
    const feature = {
      id: '53061',
      properties: {
        COUNTY: 'Bronx County',
      },
      state: {
        cases: 234,
        deaths: 9,
      },
    };
    const { container } = render(<Popup feature={feature} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
