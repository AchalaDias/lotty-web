export const DefaultLayout = (props) => {

    const {
        children,
        isLoading,
        hasErrors
    } = props;

    return (
        <>
            {
                isLoading
                    ? <div className="content0">Loading ...</div>
                    : hasErrors
                        ? <div className="content0">An error occured while authenticating ...</div>
                        : children
            }
        </>
    );
};
