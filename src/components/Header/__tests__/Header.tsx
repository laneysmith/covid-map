import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';
import { Variable } from '../../../types';
import { FetchStatus } from '../../../hooks/useFetchDataReducer';

describe('Header', () => {
  it('renders correctly without error banner', () => {
    const { container } = render(
      <Header selectedVariable={Variable.DEATHS} selectedDate="2020-02-14" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with error banner', () => {
    const { container } = render(
      <Header selectedVariable={Variable.DEATHS} selectedDate="" status={FetchStatus.FAILED} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
