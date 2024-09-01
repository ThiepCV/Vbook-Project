const withLayout = (Component, Layout) => {
    return (props) => {
        const PageComponent = Component;  // Đảm bảo rằng Component là một component React
        return (
            Layout ? (
                <Layout>
                    <PageComponent {...props} />
                </Layout>
            ) : (
                <PageComponent {...props} />
            )
        );
    };
};
export default withLayout