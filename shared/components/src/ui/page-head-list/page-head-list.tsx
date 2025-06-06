import { Button } from "antd";
import { FC, ReactElement } from "react";
import { Link } from "react-router";
import { TPageHeadListProps } from "./type";
import { Guard } from "../../guard";

export const PageHeadList: FC<TPageHeadListProps> = (props): ReactElement => {
  return (
    <section className="flex w-full justify-between mb-6">
      <h1 className="text-2xl mb-6">{props.title}</h1>
      {props.createText && props.createPermission && (
        <Guard permissions={[props.createPermission]}>
          <Link to={props.createRoute ?? "#"}>
            <Button size="large" type="primary">
              {props.createText}
            </Button>
          </Link>
        </Guard>
      )}
    </section>
  );
};
