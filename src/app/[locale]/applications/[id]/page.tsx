import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { getApplicationData } from '@/lib/applications';
import { ApplicationHero } from '@/components/applications/ApplicationHero';
import { notFound } from 'next/navigation';

interface PageParams {
    locale: Locale;
    id: string;
}

interface Props {
    params: Promise<PageParams>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ApplicationDetailPage(props: Props) {
    const params = await props.params;
    const { locale, id } = params;
    const dict = await getDictionary(locale);
    const { applications } = await getApplicationData(locale);

    const application = applications.find(app => app.id === id);
    if (!application) {
        notFound();
    }

    // 默认的应用详情页面
    return (
        <>
            <ApplicationHero
                title={application.title}
                description={application.description}
                dict={dict}
                locale={locale}
            />
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* 左栏：描述和解决方案 */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                {dict.applications.descriptionLabel}
                            </h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {application.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                {dict.applications.solutionLabel}
                            </h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {application.solution}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function generateStaticParams(): Promise<PageParams[]> {
    const locales: Locale[] = ['zh', 'en', 'es', 'de'];
    const allParams: PageParams[] = [];

    for (const locale of locales) {
        const { applications } = await getApplicationData(locale);
        applications.forEach(app => {
            allParams.push({ locale, id: app.id });
        });
    }

    return allParams;
}

export const dynamic = 'force-static';