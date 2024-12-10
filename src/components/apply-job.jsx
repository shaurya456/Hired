import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  
  const questions = [
    {
      question: "Which data structure is best to solve an input with different data typed values?",
      options: ["Arrays", "Queues", "Linked List", "Trees"],
    },
    {
      question: "Which algorithm is used for finding the shortest path in a graph?",
      options: ["Dijkstra's Algorithm", "DFS", "BFS", "Prim's Algorithm"],
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(log n)", "O(n)", "O(n^2)", "O(n log n)"],
    },
    
  ];

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false); // State to manage assessment drawer open status

  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }else {
      closeAssessmentDrawer(); // Close drawer if it's the last question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const onSubmitAssessment = (data) => {
    // Handle the submission logic here
    handleNextQuestion(); // Move to next question or close if it's the last
  };

  const closeAssessmentDrawer = () => {
    setIsAssessmentOpen(false); // Close the drawer
    setCurrentQuestionIndex(0); // Reset to the first question
  };

  return (
    <>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            variant={job?.isOpen && !applied ? "blue" : "destructive"}
            disabled={!job?.isOpen || applied}
          >
            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
            <DrawerDescription>Please Fill the form below</DrawerDescription>
          </DrawerHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 pb-0"
          >

          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Post Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}
          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 file:text-gray-500"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}
          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
            
          </form>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


      <Drawer open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            variant={job?.isOpen && applied ? "blue" : "destructive"}
            disabled={!applied}
            onClick={() => setIsAssessmentOpen(true)} 
          >
            Take Assessment
          </Button>
        </DrawerTrigger>
        <DrawerContent>

          <div className="flex flex-col items-center justify-center w-full text-center">
            <DrawerHeader>
              <DrawerTitle className="text-lg font-bold mb-1 text-center">
                Check the Correct Answer
              </DrawerTitle>
              <DrawerDescription className="text-md mb-2">
                Attend all the questions within the provided limit.
              </DrawerDescription>
            </DrawerHeader>
          </div>


          <div className="flex justify-between px-4">
            <Button variant="outline" size="icon" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>


          <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={handleSubmit(onSubmitAssessment)}>
            <div className="pl-12 ml-8 mb-10">
              <h1 className="text-3xl">Question:</h1>
              <p className="mb-10 mt-4 text-2xl">{questions[currentQuestionIndex].question}</p>

              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} {...field}>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option-{...index}} />
                        <Label htmlFor={option-{...index}} className="text-lg">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.education && (
                <p className="text-red-500">{errors.education.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" variant="blue" onClick={handleNextQuestion || closeAssessmentDrawer}>Submit</Button>
          </form>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="destructive">End</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
