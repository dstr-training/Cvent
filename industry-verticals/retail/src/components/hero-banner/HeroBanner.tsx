import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink?: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
      </div>

      {/* Wave divider - single smooth curve: high left, dips center, rises right */}
      <div className="absolute right-0 bottom-0 left-0 z-10 w-full">
        <svg
          className="block h-20 w-full md:h-28 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-238 w-full py-10 lg:w-1/2 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-182">
              <div className={clsx({ shim: screenLayer })}>
                {/* Title */}
                <h1 className="text-center text-5xl leading-[110%] font-bold text-white capitalize md:text-7xl md:leading-[130%] lg:text-left xl:text-[80px]">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch] lg:mx-0" />}
                </h1>

                {/* Description */}
                <div className="mt-7 text-xl text-white md:text-2xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-center lg:text-left"
                  />
                </div>

                {/* CTA Link or Placeholder */}
                <div className="mt-6 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link
                      field={fields.CtaLink}
                      className="inline-flex items-center justify-center rounded-lg bg-[#006ae1] px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#1e3a5f]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-238 justify-center px-4">
          <div
            className={`flex flex-col items-center py-10 lg:py-44 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              {/* Title */}
              <h1 className="text-center text-5xl leading-[110%] font-bold text-white capitalize md:text-7xl md:leading-[130%] xl:text-[80px]">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch]" />}
              </h1>

              {/* Description */}
              <div className="mt-7 text-xl text-white md:text-2xl">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link
                    field={fields.CtaLink}
                    className="inline-flex items-center justify-center rounded-lg bg-[#006ae1] px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#1e3a5f]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

/**
 * Cvent-style hero: split layout with text left, product image right.
 * Light background, headline + subhead + bullets, primary + secondary CTAs.
 */
export const CventStyle = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner cvent-style ${params.styles}`} id={id}>
        [HERO BANNER - Cvent Style]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner cvent-style bg-background relative overflow-hidden ${params.styles}`}
      id={id}
    >
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid min-h-[400px] w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: Text content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-foreground text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              <ContentSdkText field={fields.Title} />
            </h1>

            <div className="text-foreground-light mt-6 text-lg md:text-xl">
              <ContentSdkRichText
                field={fields.Description}
                className="[&_li]:marker:text-accent [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                field={fields.CtaLink}
                className="inline-flex w-fit items-center justify-center rounded-lg bg-[#006ae1] px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#1e3a5f]"
              />
              {fields.SecondaryCtaLink?.value?.href && (
                <Link
                  field={fields.SecondaryCtaLink}
                  className="border-accent text-accent hover:bg-accent/10 inline-flex w-fit items-center justify-center rounded-md border-2 px-8 py-3 font-semibold transition-colors"
                />
              )}
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative order-first lg:order-last">
            {fields.Image?.value?.src ? (
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <ContentSdkImage
                  field={fields.Image}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            ) : (
              isPageEditing && (
                <div className="border-border bg-background-surface flex aspect-video items-center justify-center rounded-lg border-2 border-dashed">
                  <span className="text-foreground-muted">Hero image</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Wave divider - single smooth curve: high left, dips center, rises right */}
      <div className="absolute right-0 bottom-0 left-0 z-10 w-full">
        <svg
          className="block h-20 w-full md:h-28 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};
