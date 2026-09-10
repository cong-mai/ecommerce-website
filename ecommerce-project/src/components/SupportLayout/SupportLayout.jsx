import React, { useEffect, useState } from 'react'
import {
    Wrapper, Inner, Header, Eyebrow, Title, Rule, Intro,
    Layout, Rail, RailItem, RailLink, Content
} from './style'

// Two rail modes, chosen by content shape:
// - `sections`: this page has its own long-form content, so the rail is a
//   real table of contents that tracks scroll position (Help Center, Return
//   Policy, Privacy Policy, Terms of Service).
// - `navLinks`: this page is short and single-purpose, so the rail instead
//   cross-links the other pages in the same support/about family (How to
//   Order, Track My Order, Contact Us, and the two "About" pages).
const SupportLayout = ({ backTo, backLabel, title, intro, sections, navLinks, children }) => {
    const [activeId, setActiveId] = useState(sections?.[0]?.id)

    useEffect(() => {
        if (!sections?.length) return undefined

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible[0]) {
                    setActiveId(visible[0].target.id)
                }
            },
            { rootMargin: '-96px 0px -70% 0px' }
        )

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sections?.length])

    const handleRailClick = (id) => (e) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setActiveId(id)
    }

    return (
        <Wrapper>
            <Inner>
                <Header>
                    {backTo && <Eyebrow to={backTo}>{backLabel}</Eyebrow>}
                    <Title>{title}</Title>
                    <Rule />
                    {intro && <Intro>{intro}</Intro>}
                </Header>

                <Layout>
                    <Rail aria-label={sections ? 'Section navigation' : 'Related pages'}>
                        {sections?.map((section) => (
                            <RailItem
                                key={section.id}
                                href={`#${section.id}`}
                                $active={activeId === section.id}
                                onClick={handleRailClick(section.id)}
                            >
                                {section.label}
                            </RailItem>
                        ))}
                        {navLinks?.map((link) => (
                            <RailLink key={link.to} to={link.to}>
                                {link.label}
                            </RailLink>
                        ))}
                    </Rail>

                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Inner>
        </Wrapper>
    )
}

export default SupportLayout
export { Section, SectionTitle, Body } from './style'
