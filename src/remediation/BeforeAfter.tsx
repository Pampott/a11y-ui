import { useId } from 'react';

export interface Finding {
  /** WCAG 2.2 success criterion, e.g. "3.3.1 Error Identification". */
  criterion: string;
  /** What is wrong in the "before" version. */
  problem: string;
  /** What the "after" version does instead. */
  fix: string;
}

export interface BeforeAfterProps {
  title: string;
  /** Where this pattern typically shows up. */
  context: string;
  before: React.ReactNode;
  after: React.ReactNode;
  /** Approximate screen-reader output for the "before" version. */
  announcedBefore: string;
  /** Approximate screen-reader output for the "after" version. */
  announcedAfter: string;
  /** Whether an automated axe-core scan catches the "before" version. */
  axeVerdict: string;
  findings: Finding[];
}

/**
 * Layout for a remediation example: the faulty version and the corrected one
 * side by side, with what assistive technology announces and the list of fixes.
 *
 * "Before" and "After" are always labelled in text — never by colour alone.
 */
export function BeforeAfter({
  title,
  context,
  before,
  after,
  announcedBefore,
  announcedAfter,
  axeVerdict,
  findings,
}: BeforeAfterProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="mx-auto flex max-w-4xl flex-col gap-6 text-gray-900">
      <header className="flex flex-col gap-1">
        <h2 id={titleId} className="text-2xl font-semibold">
          {title}
        </h2>
        <p className="text-base text-gray-700">{context}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel
          heading="Before — as found"
          announced={announcedBefore}
          className="border-dashed border-gray-500"
        >
          {before}
        </Panel>
        <Panel
          heading="After — remediated"
          announced={announcedAfter}
          className="border-solid border-gray-900"
        >
          {after}
        </Panel>
      </div>

      <p className="text-sm text-gray-700">
        <strong className="font-semibold text-gray-900">Automated scan (axe-core): </strong>
        {axeVerdict}
      </p>

      <table className="w-full border-collapse text-left text-sm">
        <caption className="mb-2 text-left text-base font-semibold">
          What was fixed
        </caption>
        <thead>
          <tr className="border-b border-gray-400">
            <th scope="col" className="py-2 pr-4 font-semibold">
              WCAG 2.2 criterion
            </th>
            <th scope="col" className="py-2 pr-4 font-semibold">
              Problem
            </th>
            <th scope="col" className="py-2 font-semibold">
              Fix
            </th>
          </tr>
        </thead>
        <tbody>
          {findings.map((finding) => (
            <tr key={finding.criterion} className="border-b border-gray-300 align-top">
              <th scope="row" className="py-2 pr-4 font-medium">
                {finding.criterion}
              </th>
              <td className="py-2 pr-4">{finding.problem}</td>
              <td className="py-2">{finding.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Panel({
  heading,
  announced,
  className,
  children,
}: {
  heading: string;
  announced: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-4 rounded-token border-2 p-4 ${className}`}>
      <h3 className="text-base font-semibold">{heading}</h3>
      <div className="flex min-h-32 items-center">{children}</div>
      <p className="text-sm text-gray-700">
        <strong className="block font-semibold text-gray-900">Screen reader (approximate)</strong>
        {announced}
      </p>
    </div>
  );
}
