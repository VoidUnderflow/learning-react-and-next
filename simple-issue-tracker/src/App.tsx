import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  setShowOpenOnly,
  setMinComments,
  resetFilters,
} from "./store/slices/filtersSlice";
import { toggleDarkMode } from "./store/slices/uiSlice";
import { useIssues } from "./hooks/useIssues";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";

function App() {
  const { showOpenOnly, minComments } = useAppSelector(
    (state) => state.filters
  );
  const { darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  // Input state
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");

  // Submitted state for fetching
  const [submittedOwner, setSubmittedOwner] = useState("facebook");
  const [submittedRepo, setSubmittedRepo] = useState("react");

  // Fetch issues
  const {
    data: issues,
    isLoading,
    isError,
    error,
  } = useIssues(submittedOwner, submittedRepo);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Redux State Test</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Checkbox
              isSelected={darkMode}
              onValueChange={() => dispatch(toggleDarkMode())}
            >
              Dark Mode
            </Checkbox>

            <Checkbox
              isSelected={showOpenOnly}
              onValueChange={(checked) => dispatch(setShowOpenOnly(checked))}
            >
              Show open issues only
            </Checkbox>

            <Input
              type="text"
              label="Repository owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />

            <Input
              type="text"
              label="Repository Name"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />

            <Button
              color="primary"
              onPress={() => {
                setSubmittedOwner(owner);
                setSubmittedRepo(repo);
              }}
            >
              Fetch Issues
            </Button>

            <Input
              type="number"
              label="Minimum comments"
              value={minComments.toString()}
              onChange={(e) => dispatch(setMinComments(Number(e.target.value)))}
              min={0}
              className="max-w-xs"
            />

            <Button
              color="danger"
              variant="bordered"
              onPress={() => dispatch(resetFilters())}
              className="w-fit"
            >
              Reset Filters
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold mb-2">Issues:</h3>
            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-red-500">Error: {error?.message}</p>}
            {issues && (
              <div className="space-y-2">
                <p className="text-sm text-default-500">
                  {issues.length} issues found
                </p>
                {issues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    className="border-b border-default-200 pb-2"
                  >
                    <p className="font-semibold">
                      #{issue.number} {issue.title}
                    </p>
                    <p className="text-sm text-default-500">
                      {issue.state} • {issue.comments} comments • by{" "}
                      {issue.user.login}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold mb-2">Current State:</h3>
            <pre className="text-sm bg-default-100 p-3 rounded-lg">
              {JSON.stringify({ showOpenOnly, minComments, darkMode }, null, 2)}
            </pre>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}

export default App;
