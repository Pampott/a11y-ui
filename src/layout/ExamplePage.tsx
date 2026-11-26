import {
  Callout,
  Card,
  CheckFeed,
  CodeBlock,
  CodeSkeleton,
  Container,
  DataTable,
  DefinitionList,
  Disclosure,
  Eyebrow,
  Grid,
  Heading,
  Highlight,
  List,
  Price,
  ProgressList,
  ProgressRing,
  Section,
  Showcase,
  SiteFooter,
  SiteHeader,
  Split,
  StatList,
  StepList,
  Text,
  TextLink,
  ButtonLink,
  WindowFrame,
} from '../index';

/** A page built only from the design system, used by the tests and the Storybook. */
export function Page() {
  return (
    <>
      <SiteHeader
        brand={<a href="/">clairoki.</a>}
        navLabel="Menu principal"
        links={[
          { href: '#offres', label: 'Offres' },
          { href: '/scan', label: 'Scan', current: true },
        ]}
        action={<ButtonLink href="#demande">Demander</ButtonLink>}
      />
      <main>
        <Section aria-labelledby="t">
          <Container>
            <Split>
              <div>
                <Eyebrow>Accessibilité</Eyebrow>
                <Heading level={1} id="t" size="display">
                  Un site <Highlight>clair</Highlight>
                </Heading>
                <Text tone="muted" size="lg" measure="narrow">Une page composée uniquement de composants a11y-ui, sans une ligne de CSS. Changez de thème dans la barre d'outils.</Text>
                <TextLink href="/scan" arrow>Lancer le scan</TextLink>
              </div>
              <Showcase media={
                  <svg viewBox="0 0 100 100" className="h-48 w-48" aria-hidden="true">
                    <circle cx="50" cy="50" r="44" className="fill-brand-soft" />
                    <path d="M30 52 L44 66 L70 38" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" className="stroke-brand" />
                  </svg>
                } notes={[{ title: 'Scan', body: 'en 5 secondes' }]} />
            </Split>
            <Grid columns={3}>
              <Card as="article">
                <Heading level={2} size="md">Carte</Heading>
                <Price amount="550 €" suffix="HT" />
                <List variant="check" items={['Un', 'Deux']} />
              </Card>
              <Card variant="featured">
                <StatList items={[{ term: 'Sites testés', description: '12' }]} />
              </Card>
              <Callout title="Bon à savoir">Note</Callout>
            </Grid>
            <StepList items={[{ title: 'Scan' }, { title: 'Correction' }]} />
            <StepList variant="timeline" items={[{ title: 'Jour 1', meta: 'J1' }]} />
            <DefinitionList items={[{ term: 'Délai', description: '5 jours' }]} />
            <DataTable
              caption="Tarifs"
              columns={[
                { key: 'n', header: 'Offre', cell: (r: { n: string; p: string }) => r.n, rowHeader: true },
                { key: 'p', header: 'Prix', cell: (r: { n: string; p: string }) => r.p, align: 'end' },
              ]}
              rows={[{ n: 'Diagnostic', p: '550 €' }]}
              rowKey={(r) => r.n}
            />
            <CodeBlock label="Code corrigé" code="<button>OK</button>" tone="success" />
            <Disclosure summary="Voir le détail">Détail</Disclosure>
            <WindowFrame title="exemple.fr">
              <ProgressRing value={72} label="Score" />
            </WindowFrame>
            <CodeSkeleton />
            <ProgressList
              doneLabel="terminé"
              items={[
                { id: 'a', title: 'Page reçue', state: 'done' },
                { id: 'b', title: 'Lecture', state: 'active' },
                { id: 'c', title: 'Vérifications', state: 'todo' },
              ]}
            />
            <CheckFeed items={[{ id: 'x', label: 'Langue', status: 'pass', statusLabel: 'conforme' }]} />
          </Container>
        </Section>
      </main>
      <SiteFooter
        brand={<a href="/">clairoki.</a>}
        groups={[{ title: 'Légal', navLabel: 'Légal', links: [{ href: '/mentions', label: 'Mentions' }] }]}
      />
    </>
  );
}

