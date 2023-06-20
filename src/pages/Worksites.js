import React, {useEffect, useState} from 'react';
import Worksite from '../Components/Worksite';
import WorksiteLoadingComponent from '../Components/WorksiteLoading';
import WorksitesDrawer from '../Components/WorksitesDrawer';

function Worksites() {
  const WorksiteLoading = WorksiteLoadingComponent(WorksitesDrawer);
  const [worksiteState, setWorksiteState] = useState({
    loading: false,
    worksites: null,
  });
  const [activeWorksite, setActiveWorksite] = useState('')

  useEffect(() => {
    setWorksiteState({ loading: true });
    const apiUrl = `http://127.0.0.1:8000/api/worksite/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((worksites) => {
        setWorksiteState({ loading: false, worksites: worksites});
      });
  }, [setWorksiteState]);

    return (
      <div style={{display:'flex'}}>
        <WorksiteLoading isLoading={worksiteState.loading} worksites={worksiteState.worksites} setActiveWorksite={setActiveWorksite} activeWorksite={activeWorksite} />
        <Worksite worksite={activeWorksite} />
      </div>
    )
  }

  export default Worksites;