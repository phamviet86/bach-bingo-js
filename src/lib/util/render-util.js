// @/lib/util/render-util.js


/**
 * Renders a breadcrumb item for use in Ant Design Pro PageContainer.
 *
 * If the item has a `path`, it will be rendered as a Next.js Link.
 * Otherwise, it will render the title as plain text.
 *
 * @param {Object} item - Breadcrumb item object.
 * @param {string} item.title - The display title of the breadcrumb.
 * @param {string} [item.path] - The optional path for navigation.
 * @returns {JSX.Element|string} The rendered breadcrumb item.
 *
 * @example
 * // With path
 * renderBreadcrumbItem({ title: "Home", path: "/" });
 * // => <Link href="/">Home</Link>
 *
 * // Without path
 * renderBreadcrumbItem({ title: "Dashboard" });
 * // => "Dashboard"
 */

