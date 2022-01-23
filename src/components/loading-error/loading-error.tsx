import React, {FC} from "react";

interface ILoadingErrorProps {
  title: string
}

export const LoadingError: FC<ILoadingErrorProps> = (props: { title: string }) => {
  return <h3>Ops, something went wrong, failed to load {props.title} please try again later</h3>;
}
