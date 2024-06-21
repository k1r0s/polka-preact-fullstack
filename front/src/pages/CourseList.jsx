import { CourseCard } from "@/components/CourseCard.jsx";
import { Get } from "@/components/Api.jsx";
import { Flex } from "@/components/Flex.jsx";

export function CourseList () {
  return (
    <Get uri="/courses" resolve={(arr = [], trigger) => (
      <section>
      {arr.map(courseUid => (
        <>
          <CourseCard uid={courseUid} reload={trigger} />
          <br />
        </>
      ))}
      </section>
    )} />
  );
}
