import React, {useEffect, useState} from 'react';
import axiosInstance from '../axios';
import Worksite from '../Components/worksite/Worksite';
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

    axiosInstance
      .get('/worksites/')
      .then(response => {
        const worksites = response.data;
        console.log(worksites)
        setWorksiteState({ loading: false, worksites: worksites});
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des chantiers :', error);
        setWorksiteState({ loading: false, worksites: [] });
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