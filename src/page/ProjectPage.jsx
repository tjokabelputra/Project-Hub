import React, { useState } from 'react';
import ProjectListComponent from '../components/ProjectPage/ProjectListComponent.jsx';

function ProjectPage({ projects }) {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <section className="project-page">
      { pageIndex === 0 &&
          (
            <ProjectListComponent
              projects={projects}/>
          )
      }
    </section>
  );
}

export default ProjectPage;