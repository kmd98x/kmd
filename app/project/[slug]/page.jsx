import Projects from "../../data/projects.json";
import ProjectSections from "../../components/ProjectSections";

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const project = Projects.find((p) => p.slug === slug);

    if (!project) {
        return <div className="text-white">Project not found</div>;
    }

    return (
        <ProjectSections sections={project.sections ?? []} />
    );
}