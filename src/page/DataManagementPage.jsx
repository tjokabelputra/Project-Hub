import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateInputs } from '../states/shared/action.js';
import DataListComponent from '../components/ManagePage/sub/DataListComponent.jsx';

function DataManagementPage() {
  const pms = useSelector((states) => states.pms);
  const bps = useSelector((states) => states.bps);
  const units = useSelector((states) => states.units);
  const dispatch = useDispatch();

  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    dispatch(asyncPopulateInputs());
  }, [dispatch]);

  const onAddData = () => {
    setPageIndex(1);
  };

  return (
    <section className="management-page">
      {pageIndex === 0 && (
        <DataListComponent
          pms={pms}
          bps={bps}
          units={units}
          onAddData={onAddData}/>
      )}
    </section>
  );
}

export default DataManagementPage;