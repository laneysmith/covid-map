import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';
import { Variable } from '../../../types';

describe('Header', () => {
  it('renders correctly without error banner', () => {
    const { container } = render(
      <Header selectedVariable={Variable.DEATHS} selectedDate="2020-02-14" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with error banner', () => {
    const { container } = render(
      <Header selectedVariable={Variable.DEATHS} selectedDate={null} error />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
