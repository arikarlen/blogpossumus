import { Fragment } from "react";
import ContentLoader from "react-content-loader";

export default function ListDataSkeleton({ totalElementsList = 10 }) {
  
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center items-center min-h-full max-w-screen-lg">
        <ContentLoader
          speed={2}
          width={1024}
          height={700}
          viewBox="0 0 1024 700"
          backgroundColor="#c2c2c2"
          foregroundColor="#adadad"
        >
          <rect x="0" y="130" rx="5" ry="5" width="100" height="15" />
          {Array(totalElementsList).fill("").map((e, idx) => {
            const idSkeleton = idx + 1;
            return (
              <Fragment key={idSkeleton}>
                <rect
                  x="0"
                  y={155 * idSkeleton}
                  rx="5"
                  ry="5"
                  width="750"
                  height="30"
                />
                <rect
                  x="0"
                  y={195 * idSkeleton}
                  rx="5"
                  ry="5"
                  width="350"
                  height="30"
                />
                <rect
                  x="800"
                  y={155 * idSkeleton}
                  rx="5"
                  ry="5"
                  width="230"
                  height="130"
                />
              </Fragment>
            );
          })}
        </ContentLoader>
      </div>
    </div>
  );
}
